const dataSourceTableSkalaBanding = [
  {
    key: "1",
    kepentingan: "1",
    definisi: "Kedua elemen sangat penting",
  },
  {
    key: "2",
    kepentingan: "3",
    definisi: "Elemen yang satu agak lebih penting dibanding elemen yang kedua",
  },
  {
    key: "3",
    kepentingan: "5",
    definisi: "Elemen yang satu lebih penting dibanding elemen yang kedua",
  },
  {
    key: "4",
    kepentingan: "7",
    definisi:
      "Elemen yang satu sangat lebih penting dibanding elemen yang kedua",
  },
  {
    key: "5",
    kepentingan: "9",
    definisi:
      "Elemen yang satu mutlak lebih penting dibanding elemen yang kedu",
  },
  {
    key: "5",
    kepentingan: "2,4,6",
    definisi: "Nilai-nilai diantara dua nilai yang berdekatan",
  },
  {
    key: "6",
    kepentingan: "Kebalikan",
    definisi:
      "Jika aktivitas i mendapat suatu angka terhadap j, maka j mempunyai nilai kebalikannya bila dibandingkan dengan i",
  },
];

const columnsTableSkalaBanding = [
  {
    title: "Kepentingan / Skala",
    dataIndex: "kepentingan",
    key: "kepentingan",
  },
  {
    title: "Defenisi",
    dataIndex: "defnisi",
    key: "definisi",
    render: (_, { definisi }) => definisi,
  },
];

export { dataSourceTableSkalaBanding, columnsTableSkalaBanding };
