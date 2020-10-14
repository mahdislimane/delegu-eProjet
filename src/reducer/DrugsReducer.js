const initialState = [
  {
    name: "Gastro_entérologue",
    medic: ["GincorFort", "Phloro", "Ilax"],
  },
  {
    name: "Chirurgien Esthétique",
    medic: ["GincorFort", "Phloro", "Ilax"],
  },
  {
    name: "Angiologue",
    medic: ["GincorFort", "Phloro", "Ilax"],
  },
  {
    name: "Néphrologue",
    medic: ["GincorFort", "Phloro", "Ilax"],
  },
  {
    name: "Dermatologue",
    medic: ["Allergica", "ecrant"],
  },
  {
    name: "Psychothérapeute",
    medic: ["Allergica", "ecrant"],
  },
  {
    name: "Urologue",
    medic: ["Allergica", "ecrant"],
  },
  {
    name: "Orthodontiste",
    medic: ["Allergica", "ecrant"],
  },
  {
    name: "Cardiologue",
    medic: ["teros"],
  },
  {
    name: "Pneumologue",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Endocrinologue Diabétologue",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Médecin Esthétique",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Radiologue",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Nutritionniste",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Ophtalmologue",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Neurochirurgien",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Rhumatologue",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Psychiatre",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Audioprothésiste",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Médecin Physique Réadaptateur",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Gynécologue Obstétricien",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Chirurgien Urologue",
    medic: ["panadol", "IPP", "Appranax"],
  },
  {
    name: "Chirurgien Orthopédiste Traumatologue",
    medic: ["panadol", "IPP", "Appranax"],
  },
];
const DrugsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default DrugsReducer;
