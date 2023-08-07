import React, { useMemo } from "react";

function useSortData(data) {
  const sortedData = useMemo(() => {
    const sort = data?.listNama?.map((nama, i) => {
      let nilai = data?.listNilai[i];
      const deathTime = getDeathTimer(nilai);
      let obj = { name: nama, ...deathTime };
      if (/.*c.*o.*|.*o.*c.*/i.test(nama)) {
        obj = { ...obj, nilai, kelas: "6" };
      } else {
        if (nilai < 60) obj = { ...obj, nilai, kelas: "1" };
        if (nilai >= 60 && nilai < 70) obj = { ...obj, nilai, kelas: "2" };
        if (nilai >= 70 && nilai < 80) obj = { ...obj, nilai, kelas: "3" };
        if (nilai >= 80 && nilai < 90) obj = { ...obj, nilai, kelas: "4" };
        if (nilai >= 90 && nilai < 100) obj = { ...obj, nilai, kelas: "5" };
      }
      return obj;
    });
    return sort;
  }, [data]);
  return data ? sortedData : null;
}

// utils/function for checking primeNumber and setDeathTime for every entries
const isPrime = (grade) => {
  for (let i = 2, s = Math.sqrt(grade); i <= s; i++) {
    if (grade % 2 == 0) return false;
  }
  return grade > 1;
};

const getDeathTimer = (grade) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const cursedMonth = (grade - 1)?.toString().at(-1);
  let obj;
  if (currentMonth <= cursedMonth) {
    obj = { deathTime: new Date(currentYear, cursedMonth).toLocaleString() };
  } else {
    obj = {
      deathTime: new Date(currentYear + 1, cursedMonth).toLocaleString(),
    };
  }
  return isPrime(grade) ? obj : { deathTime: null };
};
export default useSortData;
