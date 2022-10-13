const calculateDeathAge = (age: number) => {
    const resp = Math.floor(Math.random() * (100 - age)) + age;
    return resp;
};

export default calculateDeathAge;