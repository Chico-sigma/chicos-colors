const ExcelJS = require("exceljs");
const User = require("../models/User");

async function exportUsers(request, response, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Chico's Colors";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "Name", key: "name", width: 26 },
      { header: "Email", key: "email", width: 34 },
      { header: "Role", key: "role", width: 14 },
      { header: "Registered At", key: "createdAt", width: 24 },
      { header: "Saved Favorites", key: "favoritesCount", width: 18 }
    ];

    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F7B7F" } };
    worksheet.autoFilter = "A1:E1";

    users.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        favoritesCount: user.favorites?.length || 0
      });
    });

    worksheet.getColumn("createdAt").numFmt = "yyyy-mm-dd hh:mm";
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) row.alignment = { vertical: "middle" };
    });

    response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    response.setHeader("Content-Disposition", `attachment; filename="chicos-colors-users-${new Date().toISOString().slice(0, 10)}.xlsx"`);
    await workbook.xlsx.write(response);
    response.end();
  } catch (error) {
    next(error);
  }
}

module.exports = { exportUsers };
