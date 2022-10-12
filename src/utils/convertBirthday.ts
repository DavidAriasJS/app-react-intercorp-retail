
const convertBirthday = (birthdaySec: number) => {
    const date = new Date(birthdaySec * 1000),
    datevalues = [
      date.getDate(),
      date.getMonth()+1,
      date.getFullYear(),
    ];

    return datevalues.join('/');
}

export default convertBirthday;