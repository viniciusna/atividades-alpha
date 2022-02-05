const EMPLOYEES_LIST = [
    {
        registrationNumber: 1,
        name: 'Vinicius Noronha',
        ramal: "10",
        email: "vini@email.com",
        sector: "TI",
        birthDate: "30/09/1998"
    },

    {
        registrationNumber: 2,
        name: 'Davi Noronha',
        ramal: "11",
        email: "davi@email.com",
        sector: "TI",
        birthDate: "07/10/2003"
    },

    {
        registrationNumber: 3,
        name: 'Rainbow Mika',
        ramal: "20",
        email: "mikamika@email.com",
        sector: "Marketing",
        birthDate: "10/06/1995"
    },

    {   registrationNumber: 4,
        name: 'G',
        ramal: "04",
        email: "thewolrdspresident@email.com",
        sector: "Administração",
        birthDate: "04/07/1980"
    },

    {   registrationNumber: 5,
        name: 'Karin',
        ramal: "30",
        email: "karin1011@email.com",
        sector: "Vendas",
        birthDate: "10/11/1990"
    },

    {   registrationNumber: 6,
        name: 'Guile',
        ramal: "40",
        email: "guileaf@email.com",
        sector: "Segurança",
        birthDate: "10/02/1985"
    },

    {   registrationNumber: 7,
        name: 'Chun-li',
        ramal: "50",
        email: "chuchu@email.com",
        sector: "Contabilidade",
        birthDate: "20/02/1990"
    },
]

EMPLOYEES_LIST.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

export default EMPLOYEES_LIST