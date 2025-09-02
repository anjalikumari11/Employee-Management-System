package com.EmployeMangement.EmployeeSystem.Service;

import com.EmployeMangement.EmployeeSystem.DAO.SalaryDetails;
import com.EmployeMangement.EmployeeSystem.DAO.SalarySlipLog;
import com.EmployeMangement.EmployeeSystem.DAO.User;
import com.EmployeMangement.EmployeeSystem.Repository.SalaryDetailsRepository;
import com.EmployeMangement.EmployeeSystem.Repository.SalarySlipRepository;
import com.EmployeMangement.EmployeeSystem.Repository.UserRepository;
import org.openpdf.text.*;
import org.openpdf.text.pdf.PdfPCell;
import org.openpdf.text.pdf.PdfPTable;
import org.openpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;

@Service
public class SalarySlipService {

    @Autowired
    private SalaryDetailsRepository salaryDetailsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SalarySlipRepository salarySlipRepository;

    public ByteArrayInputStream generateSlip(Long salaryId){
        SalaryDetails details = salaryDetailsRepository.findById(salaryId)
                .orElseThrow(()->new RuntimeException("Salary record not found"));

        Long id = details.getUser();
        User user = userRepository.findById(details.getUser()).orElseThrow(()->new RuntimeException("User not found"));
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try{
            PdfWriter.getInstance(document,out);
            document.open();

            Paragraph ems = new Paragraph("Employee Management System",FontFactory.getFont(FontFactory.HELVETICA_BOLD,18));
            ems.setAlignment(Element.ALIGN_CENTER);
            document.add(ems);
            //title
            Paragraph title = new Paragraph("Salary Slip", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16));
            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);
            document.add(new Paragraph(" "));

            //Employee Info
            PdfPTable empTable = new PdfPTable(2);
            empTable.setWidthPercentage(100);
            empTable.addCell(cell("Employee Name"));
            empTable.addCell(cell(user.getName()));
            empTable.addCell(cell("Employee ID"));
            empTable.addCell(cell(String.valueOf(details.getUser())));
            empTable.addCell(cell("Phone No."));
            empTable.addCell(cell(user.getPhone()));
            empTable.addCell(cell("Department"));
            empTable.addCell(cell(user.getDepartment()));
            document.add(empTable);

            document.add(new Paragraph(" "));

            //Salary Info
            PdfPTable salTable = new PdfPTable(2);
            salTable.setWidthPercentage(100);
            salTable.addCell(cell("Basic Pay"));
            salTable.addCell(cell(format(details.getBasicSalary())));
            salTable.addCell(cell("Allowances"));
            salTable.addCell(cell(format(details.getAllowances())));
            salTable.addCell(cell("Bonus"));
            salTable.addCell(cell(format(details.getBonus())));
            salTable.addCell(cell("PF"));
            salTable.addCell(cell(format(details.getPfDeduction())));
            salTable.addCell(cell("Tax"));
            salTable.addCell(cell(format(details.getTaxDeduction())));

            BigDecimal totalEarnings = safe(details.getBasicSalary())
                    .add(safe(details.getAllowances()))
                    .add(safe(details.getBonus()));
            BigDecimal totalDeductions = safe(details.getPfDeduction())
                    .add(safe(details.getTaxDeduction()));
            BigDecimal netPay = totalEarnings.subtract(totalDeductions);

            salTable.addCell(cell("Net Salary"));
            salTable.addCell(cell(format(netPay)));
            document.add(salTable);
            document.add(new Paragraph("\nNote: This is a computer generated slip."));

            document.close();

            SalarySlipLog log = new SalarySlipLog();
            log.setSalaryId(details.getId());
            log.setEmployeeId(details.getUser());
            salarySlipRepository.save(log);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private PdfPCell cell(String text) {
        PdfPCell c = new PdfPCell(new Phrase(text));
        c.setPadding(5);
        return c;
    }

    private BigDecimal safe(Float v) {
        return v == null ? BigDecimal.ZERO : BigDecimal.valueOf(v);
    }

    private String format(Float v) {
        return v == null ? "0.00" : String.format("%.2f", v);
    }

    private String format(BigDecimal v) {
        return v == null ? "0.00" : v.toPlainString();
    }

}
