import { roundUp3 } from "../helpers";

const dataQ1 = [
  {
    value: "Pak Alde Alanda, S.Kom., M.T.",
    label: "Pak Alde Alanda, S.Kom., M.T. (Kaprodi Teknik Komputer)",
  },
  {
    value: "Defni, S.Si., M.Kom.",
    label: "Defni, S.Si., M.Kom. (Kaprodi TRPL)",
  },
  {
    value: "Deddy Prayama, S.Kom., M.ISD",
    label:
      "Deddy Prayama, S.Kom., M.ISD (Ka. Prodi D.III Manajemen Informatika PSDKU Pelalawan)",
  },
  {
    value: "Hidra Amnur, S.Kom., S.E., M.Kom",
    label:
      "Hidra Amnur, S.Kom., S.E., M.Kom (Ka. Prodi D.III Teknik Komputer PSDKU Solok Selatan)",
  },
  {
    value: "Rasyidah, S.Si., M.M",
    label:
      "Rasyidah, S.Si., M.M (Ka.Prodi D.III Sistem Informasi PSDKU Tanah Tadatar)",
  },
  {
    value: "Roni Putra, S.Kom., M.T.",
    label: "Roni Putra, S.Kom., M.T. (Kaprodi Manajemen Informatika)",
  },
];

const dataQ2 = [
  {
    id: 1,
    name: "SKS Dosen",
    benefitCost: "cost",
    skala: {
      K1: 1 / 1,
      K2: roundUp3(5 / 1),
      K3: roundUp3(7 / 1),
      // K4: 6,
    },
    stringSkala: {
      K1: "1",
      K2: "5",
      K3: "7",
    },
    keterangan:
      "Semakin banyak SKS seorang dosen, semakin tidak direkomendasikan",
  },
  {
    id: 2,
    name: "Banyak mahasiswa bimbingan seorang dospem",
    benefitCost: "cost",
    skala: {
      K1: roundUp3(1 / 5),
      K2: 1 / 1,
      K3: roundUp3(3 / 1),
      // K4: 1,
    },
    stringSkala: {
      K1: "1/5",
      K2: "1",
      K3: "3",
    },
    keterangan:
      "Semakin banyak SKS seorang dosen, semakin tidak direkomendasikan",
  },
  {
    id: 3,
    name: "Relevansi judul yang diajukan mahasiswa dengan judul penelitian dosen",
    benefitCost: "benefit",
    skala: {
      K1: roundUp3(1 / 7),
      K2: roundUp3(1 / 3),
      K3: 1 / 1,
    },
    stringSkala: {
      K1: "1/7",
      K2: "1/3",
      K3: "1",
    },
    keterangan:
      "Semakin mirip/relevan judul TA yang diajukan mahasiswa dnegan penelitian dosen, semakin direkomendasikanlah dosen tersebut",
  },
  // {
  //   id: 4,
  //   name: "Seorang dosen bersedia atau tidak menjadi dosen pembimbing",
  //   benefitCost: "benefit",
  //   skala: {
  //     K1: 1,
  //     K2: 1,
  //     K3: 1,
  //   },
  //   keterangan: "Jikalau dosen bersedia, maka akan semakin direkomendasikan",
  // },
];

const dataQ3 = [
  { id: 1, name: "Setiap mahasiswa mengajukan judul TA" },
  {
    id: 2,
    name: "Judul TA yang diajukan semua mahasiswa, dilakukan diskusi dengan pihak kbk",
  },
  {
    id: 3,
    name: "Pengumuman judul TA yang diterima kepada setiap mahasiswa sembari dihubungi setiap dosen yang akan jadi dospem 1 dan dospem 2",
  },
  {
    id: 4,
    name: "Pembagian dospem 1 dan dospem 2",
  },
  {
    id: 5,
    name: "Mahasiswa yg judulnya direvisi/ditolak/belum mengajukan diserahkan kepengurusan judul TA nya kepada dospem 1/dospem 2",
  },
];

// const dataQ4 = [
//   {
//     id: 1,
//     name: "Mahasiswa memasukkan judul ke dalam sebuah sistem",
//   },
//   {
//     id: 2,
//     name: "Dosen-dosen yang akan dijadikan dosen pembimbing muncul",
//   },
//   {
//     id: 3,
//     name: "Mahasiswa menghubungi dosen A dan melakukan komunikasi",
//   },
// ];

export { dataQ1, dataQ2, dataQ3 };
