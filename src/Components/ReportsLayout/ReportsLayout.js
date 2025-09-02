import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sample data for reports with PDF file paths
  const sampleReports = [
    {
      serialNumber: 1,
      doctorName: 'Dr. John Doe',
      doctorSpecialty: 'Cardiology',
      reportId: 'RPT001',
      fileName: 'patient_report_RPT001.pdf',
      date: '2025-08-15',
      status: 'Complete'
    },
    {
      serialNumber: 2,
      doctorName: 'Dr. Jane Smith',
      doctorSpecialty: 'Dermatology',
      reportId: 'RPT002',
      fileName: 'patient_report_RPT002.pdf',
      date: '2025-08-20',
      status: 'Complete'
    },
    {
      serialNumber: 3,
      doctorName: 'Dr. Michael Johnson',
      doctorSpecialty: 'Orthopedics',
      reportId: 'RPT003',
      fileName: 'patient_report_RPT003.pdf',
      date: '2025-08-25',
      status: 'Complete'
    },
    {
      serialNumber: 4,
      doctorName: 'Dr. Sarah Wilson',
      doctorSpecialty: 'Neurology',
      reportId: 'RPT004',
      fileName: 'patient_report_RPT004.pdf',
      date: '2025-08-28',
      status: 'Complete'
    },
    {
      serialNumber: 5,
      doctorName: 'Dr. David Brown',
      doctorSpecialty: 'Pediatrics',
      reportId: 'RPT005',
      fileName: 'patient_report_RPT005.pdf',
      date: '2025-09-01',
      status: 'Complete'
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
      return;
    }

    // Simulate loading reports
    setTimeout(() => {
      setReports(sampleReports);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  // Function to handle viewing report in new tab
  const handleViewReport = (reportId, fileName) => {
    const reportPath = `/reports/${fileName}`;
    
    // Check if file exists first
    fetch(reportPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // Open the PDF in a new tab
          window.open(reportPath, '_blank');
        } else {
          // If file doesn't exist, show a demo report or message
          alert(`Opening report ${reportId}. Note: This is a demo - actual PDF files should be placed in public/reports/`);
          
          // You can create a demo PDF viewer or redirect to a sample PDF
          window.open('data:application/pdf;base64,', '_blank');
        }
      })
      .catch(() => {
        // Fallback: Create a demo report view
        openDemoReport(reportId);
      });
  };

  // Function to create and open a demo report
  const openDemoReport = (reportId) => {
    const report = reports.find(r => r.reportId === reportId);
    if (!report) return;

    // Create a new window with demo report content
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Medical Report - ${reportId}</title>
          <style>
              body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
              .report-container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto; }
              .header { text-align: center; border-bottom: 2px solid #2190ff; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { color: #2190ff; font-size: 24px; font-weight: bold; }
              .report-title { color: #333; margin: 20px 0; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
              .info-item { padding: 10px; background: #f8f9fa; border-radius: 4px; }
              .label { font-weight: bold; color: #555; }
              .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 4px; margin: 20px 0; }
          </style>
      </head>
      <body>
          <div class="report-container">
              <div class="header">
                  <div class="logo">🏥 StayHealthy</div>
                  <h1 class="report-title">Medical Report</h1>
                  <p>Report ID: ${reportId}</p>
              </div>
              
              <div class="info-grid">
                  <div class="info-item">
                      <div class="label">Patient Name:</div>
                      <div>${sessionStorage.getItem('name') || 'John Patient'}</div>
                  </div>
                  <div class="info-item">
                      <div class="label">Doctor:</div>
                      <div>${report.doctorName}</div>
                  </div>
                  <div class="info-item">
                      <div class="label">Specialty:</div>
                      <div>${report.doctorSpecialty}</div>
                  </div>
                  <div class="info-item">
                      <div class="label">Date:</div>
                      <div>${report.date}</div>
                  </div>
              </div>
              
              <div class="content">
                  <h3>Medical Findings:</h3>
                  <p>This is a sample medical report for demonstration purposes. In a real application, this would contain actual medical data and findings from the consultation with ${report.doctorName}.</p>
                  
                  <h3>Recommendations:</h3>
                  <ul>
                      <li>Follow prescribed medication schedule</li>
                      <li>Schedule follow-up appointment in 2 weeks</li>
                      <li>Maintain healthy lifestyle</li>
                  </ul>
                  
                  <h3>Notes:</h3>
                  <p>Patient responded well to treatment. Continue current care plan.</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; color: #666;">
                  <p>This is a demo report. Replace with actual PDF files in public/reports/ folder.</p>
              </div>
          </div>
      </body>
      </html>
    `);
  };

  // Function to handle downloading report
  const handleDownloadReport = (reportId, fileName, doctorName) => {
    const reportPath = `/reports/${fileName}`;
    
    // Check if file exists first
    fetch(reportPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // Create download link
          const link = document.createElement('a');
          link.href = reportPath;
          link.download = `${reportId}_${doctorName.replace(/\s+/g, '_')}_Report.pdf`;
          link.setAttribute('target', '_blank');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Show success message
          showMessage(`Report ${reportId} downloaded successfully!`, 'success');
        } else {
          // If file doesn't exist, create and download a demo report
          downloadDemoReport(reportId, doctorName);
        }
      })
      .catch(() => {
        // Fallback: Download demo report
        downloadDemoReport(reportId, doctorName);
      });
  };

  // Function to download demo report
  const downloadDemoReport = (reportId, doctorName) => {
    const report = reports.find(r => r.reportId === reportId);
    if (!report) return;

    // Create demo content
    const content = `
MEDICAL REPORT
==============

Report ID: ${reportId}
Date: ${report.date}
Patient: ${sessionStorage.getItem('name') || 'Patient Name'}
Doctor: ${doctorName}
Specialty: ${report.doctorSpecialty}

MEDICAL FINDINGS:
This is a demo medical report for ${reportId}. 
In a real application, this would contain actual medical findings.

RECOMMENDATIONS:
- Follow prescribed treatment
- Schedule follow-up appointment
- Maintain healthy lifestyle

NOTES:
Patient responded well to consultation.

---
StayHealthy Medical Center
This is a demo report for development purposes.
    `;

    // Create and download text file (in real app, this would be a PDF)
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportId}_${doctorName.replace(/\s+/g, '_')}_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    showMessage(`Demo report ${reportId} downloaded as text file!`, 'info');
  };

  // Function to show messages
  const showMessage = (message, type = 'info') => {
    // Simple alert for now - you can enhance this with a toast notification
    alert(message);
  };

  if (loading) {
    return (
      <div className="reports-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Reports</h1>
        <p>View and download your medical reports</p>
      </div>

      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Specialty</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.serialNumber}>
                  <td>{report.serialNumber}</td>
                  <td>{report.doctorName}</td>
                  <td>{report.doctorSpecialty}</td>
                  <td>
                    <button 
                      className="btn-view"
                      onClick={() => handleViewReport(report.reportId, report.fileName)}
                      title={`View report ${report.reportId}`}
                    >
                      View Report
                    </button>
                  </td>
                  <td>
                    {/* Using anchor tag with download attribute as requested */}
                    <a
                      href={`/reports/${report.fileName}`}
                      download={`${report.reportId}_${report.doctorName.replace(/\s+/g, '_')}_Report.pdf`}
                      className="btn-download btn-download-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDownloadReport(report.reportId, report.fileName, report.doctorName);
                      }}
                      title={`Download report ${report.reportId}`}
                    >
                      Download Report
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-reports">
                  No reports available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="reports-instructions">
        <div className="instructions-box">
          <h3>📋 Instructions for PDF Reports</h3>
          <p>To enable actual PDF viewing and downloading:</p>
          <ol>
            <li>Create PDF reports using Figma or any design tool</li>
            <li>Save them as <code>patient_report_[ReportID].pdf</code></li>
            <li>Place the PDF files in the <code>public/reports/</code> folder</li>
            <li>The system will automatically detect and use the real PDF files</li>
          </ol>
          <p><strong>Note:</strong> Currently using demo reports for development purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsLayout;
