var style = {
  helpsContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "var(--background-color-light)"
  },
  helpsHeader: {
    flex: '0 0 50px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 15px',
    borderBottom: '1px solid var(--border-color)',
  },
  helpsBody: {
    overflowY: "auto",
    padding: '0 15px 30px',
  },
  helpsIcon: {
    color: "var(--text-color)",
    fontSize: "20px",
    cursor: "pointer"
  },
  modalTitle:{
    textAlign: "center",
    color: "var(--text-color-dark)"
  },
  tHModalContent:{
    fontSize: "18px",
    backgroundColor: "var(--background-color-light)",
    color: "var(--text-color-dark)",
    padding: "45px 80px",
    height: "500px",
    overflowY: "auto"
  },
};

module.exports = style;
