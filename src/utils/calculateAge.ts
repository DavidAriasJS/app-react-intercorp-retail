const calculateAge = (birthdaySeconds: number) => { 
    const birthday = new Date(birthdaySeconds * 1000);
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    return age;
}

export default calculateAge;