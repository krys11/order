const liste = [
  {
    commande: {
      date: "09/11/2023",
      format: "Petit",
      heure: "18:01:35",
      montant: 2000,
      name: "Chawarma",
      nombres: "2",
      status: "Confirmer",
    },
    notifiactionToken: "ExponentPushToken[L5Ef7PDCqE6SxdyIhbng9V]",
  },
  {
    commande: {
      date: "09/11/2023",
      format: "Lage",
      heure: "18:03:24",
      montant: 3000,
      name: "Chawarma",
      nombres: "1",
      status: "Confirmer",
    },
    notifiactionToken: "ExponentPushToken[L5Ef7PDCqE6SxdyIhbng9V]",
  },
  {
    date: "09/11/2023",
    format: "Moyen",
    heure: "18:11:49",
    montant: 4000,
    name: "Chawarma",
    nombres: "2",
    status: "Confirmer",
  },
];

// liste.map((item, i) => console.log(liste[i].commande["date"]));
console.log(liste[0].commande.date);
