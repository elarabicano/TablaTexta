/* 

table
    rows
        ['','',''],
        ['','',''],
        ['','',''],

*/
// initial table
let table = [
  ["", ""],
  ["", ""],
];

// TODO add a clear/reset botton

function clearTable() {
  undoStack = [];
  undoStack = [];
  table = [
    ["", ""],
    ["", ""],
  ];
  console.log("clearing");
  updateTable();
}

function getRowCount() {
  return table.length;
}
function getColumnCount() {
  return table[0].length;
}

function addRow() {
  table.push(Array(getColumnCount()).fill(""));
  updateTable();
}

function addColumn() {
  table.forEach((element) => {
    element.push("");
    updateTable();
  });
}

function deleteRow() {
  if (getRowCount() > 1) {
    table.pop();
    updateTable();
  }
}
function deleteColumn() {
  if (getColumnCount() > 1) {
    table.forEach((element) => {
      element.pop();
    });
    updateTable();
  }
}

function generateTable() {
  //   const table = document.getElementById("Table");
  let tableContent = "";

  let columnsWidth = Array(getColumnCount()).fill(0);

  // get the max cell width for each column
  table.forEach((row) => {
    row.forEach((content, index) => {
      columnsWidth[index] = Math.max(columnsWidth[index], content.length);
    });
  });

  // fill the content and padd it
  table.forEach((row) => {
    row.forEach((content, index) => {
      content = content.trim();
      if (index != row.length - 1) {
        tableContent += content.padEnd(columnsWidth[index], " ");
        tableContent += " | ";
      } else {
        tableContent += content;
      }
      // tableContent = tableContent.replace(/\u0020{6}/g, "\t");
    });
    // TODO do not add new line at the end
    tableContent += "\n";
  });

  /* ..... */
  const textarea = document.getElementById("tableContent");
  textarea.value = tableContent;
  updateCharCount();
}

function updateCharCount() {
  const textarea = document.getElementById("tableContent");
  const charCount = textarea.value.length;
  const charCountDiv = document.getElementById("charCount");
  charCountDiv.textContent = `Character count: ${charCount}`;
}

function copyTable() {
  const textarea = document.getElementById("tableContent");
  textarea.select();
  document.execCommand("copy");
  // TODO: implement this (not working for now)
  // copyTextToClipboard(textarea.textContent);
}

function updateTable() {
  // create new table
  const newHTMLTable = document.createElement("tbody");
  newHTMLTable.setAttribute("id", "TableBody");

  table.forEach((rowData, rowIndex) => {
    // Create a table row element
    const row = document.createElement("tr");

    // Iterate over the cells in the row data
    rowData.forEach((cellData, colIndex) => {
      const cell = document.createElement("td");
      cell.setAttribute("contenteditable", true);

      // Set the cell's text content
      cell.textContent = cellData;

      // Append the cell to the row

      // update content
      cell.addEventListener("input", function (event) {
        // TODO: add to undo stack
        table[rowIndex][colIndex] = cell.textContent;
        console.log(`new text = ${table[rowIndex][colIndex]}`);
      });
      // add to undo/redo stack
      /*   cell.addEventListener("blur", () => {
        // TODO: add to undo stack
      }); */

      row.appendChild(cell);
    });

    // Append the row to the table
    newHTMLTable.appendChild(row);
  });

  // replace old table with new table
  const oldHTMLTable = document.getElementById("TableBody");
  const parent = oldHTMLTable.parentNode;

  parent.replaceChild(newHTMLTable, oldHTMLTable);
}

/* DROP DOWN MENU STUFF --- START */

function createDropdownMenu() {
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");

  const button = document.createElement("button");
  button.classList.add("dropbtn");
  button.textContent = "Templates";
  button.onclick = toggleDropdown;
  dropdown.appendChild(button);

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");
  dropdownContent.id = "myDropdown";

  //   const links = ["Link 1", "Link 2", "Link 3"];
  //   links.forEach((linkText) => {
  //     const link = document.createElement("a");
  //     link.href = "#";
  //     link.textContent = linkText;
  //     dropdownContent.appendChild(link);
  //   });

  for (const [key, value] of Object.entries(templates)) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = key;
    link.onclick = () => {
      table = value;
      updateTable();
    };
    dropdownContent.appendChild(link);
  }

  dropdown.appendChild(dropdownContent);
  document.getElementById("topButtons").prepend(dropdown);
}

function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

/* DROP DOWN MENU STUFF --- END */

// utils

function copyTextToClipboard(text) {
  // the solutions below does not seem to work

  // Use the asynchronous Clipboard API
  // navigator.clipboard
  //   .writeText(text)
  //   .then(() => {
  //     console.log("Text copied to clipboard");
  //     // Optionally, you can provide user feedback here
  //   })
  //   .catch((err) => {
  //     console.error("Failed to copy text: ", err);
  //     // Handle errors here
  //   });

  if (!navigator.clipboard) {
    // use old commandExec() way
    document.execCommand("copy");
  } else {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        console.log("Text copied to clipboard");
      })
      .catch(function () {
        console.error("Failed to copy text: ", err);
      });
  }
}

/* set up */
// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  createDropdownMenu();
  updateTable();
});

/* -------------------------------------------------------------------------- */
/*                                  TEMPLATES                                 */
/* -------------------------------------------------------------------------- */

let spanishSubjetsTemplate = [
  ["yo", ""],
  ["tú", ""],
  ["él", ""],
  ["nosotros", ""],
  ["vosotros", ""],
  ["ellos", ""],
];
let spanishSer = [
  ["yo", "soy"],
  ["tú", "eres"],
  ["él", "es"],
  ["nosotros", "somos"],
  ["vosotros", "sois"],
  ["ellos", "son"],
];
let spanishEstar = [
  ["yo", "estoy"],
  ["tú", "estás"],
  ["él", "estás"],
  ["nosotros", "estamos"],
  ["vosotros", "estáis"],
  ["ellos", "están"],
];

const templates = {
  "Spanish Subjects": spanishSubjetsTemplate,
  "Spanish Ser": spanishSer,
  "Spanish Estar": spanishEstar,
};

const helloTalkVoiceRoomChatCharLimit = 150;

// TODO: redo/undo
let undoStack = [];
let redoStack = [];
function undo() {
  // todo
  console.log("TBD");
}
function redo() {
  // todo
  console.log("TBD");
}
