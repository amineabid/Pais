import { NavItem } from 'src/app/share/component/menu-list-item/nav-item';

export class Service {
    

    static MenuItem():NavItem[] {
        let result: any = [
            {
                displayName: 'Parametre',
                iconName: 'settings',
                children: [
                    {
                        displayName: 'Societe',
                        iconName: 'arrow_right_alt',
                        // route: '#'
                    },
                    {
                        displayName: 'Creation Dossier',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Gestion Documentation GC',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Type CNSS',
                        iconName: 'arrow_right_alt',
                        route: 'admin/mod-cnss'
                    },
                    {
                        displayName: 'Nature_Payement',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Banque',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Compatibilite',
                        iconName: 'arrow_right_alt',
                        route: 'admin/compte-comptable'
                    },
                    {
                        displayName: 'Service',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Qualification',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Situation de recrutement',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Grille de Salaire',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Mode de calcul',
                        iconName: 'arrow_right_alt',
                        route: 'admin/mode-calcule'
                    },
                    {
                        displayName: 'Indemnite',
                        iconName: 'arrow_right_alt',
                        route: 'admin/indemnite'
                    },
                    {
                        displayName: 'Cnss Convention',
                        iconName: 'arrow_right_alt',
                        route: 'admin/cnss-convention'
                    },
                    {
                        displayName: 'Prime Convention',
                        iconName: 'arrow_right_alt',
                        route: 'admin/prim-convention'
                    },
                    {
                        displayName: 'Type de Paie',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Personnel',
                        iconName: 'arrow_right_alt',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Convention',
                        iconName: 'arrow_right_alt',
                        route: 'admin/convention'
                    }
                ]
            },
            {
                displayName: 'Mouvement',
                iconName: 'pan_tool',
                children: [
                    {
                        displayName: 'Ouverture de session',
                        iconName: 'input',
                        // route: '#'
                    },
                    {
                        displayName: 'Generation de mouvement',
                        iconName: 'backup',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Mouvement Pointage',
                        iconName: 'control_point_duplicate',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Pointage',
                        iconName: 'radio_button_checked',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Suppréssion multiple',
                        iconName: 'delete_sweep',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Etat pointage',
                        iconName: 'radio_button_checked',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Calcul de paie',
                        iconName: 'point_of_sale',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Consultation Résultat',
                        iconName: 'book_online',
                        // route: 'admin/dashbord'
                    },
                    {
                        displayName: 'Etat Quotidiens',
                        iconName: 'history_edu',
                        // route: 'admin/dashbord'
                        children: [
                            {
                                displayName: 'Etat de paie',
                                iconName: 'history_edu',
                            }
                        ]
                    }
                ]
            },
            {
                displayName: 'Etats',
                iconName: 'history_edu',
            },
            {
                displayName: 'T.Mensuel',
                iconName: 'insert_invitation',
            },
            {
                displayName: 'Cloture',
                iconName: 'account_balance_wallet',
            },
            {
                displayName: 'T.Annuel',
                iconName: 'date_range',
            },
            {
                displayName: 'CNSS',
                iconName: 'groups',
            },
            {
                displayName: 'Pret',
                iconName: 'alarm_on',
            },
            {
                displayName: 'Contact',
                iconName: 'contact_phone',
            },
            {
                displayName: 'Conge',
                iconName: 'event_busy',
            },
            {
                displayName: 'Administartion',
                iconName: 'admin_panel_settings',
            },
            {
                displayName: 'Manuels',
                iconName: 'beenhere',
                children: [
                    {
                        displayName: 'PaieGC',
                        iconName: '',
                    },
                    {
                        displayName: 'Loi finance',
                        iconName: '',
                        children: [
                            {
                                displayName: '2018',
                                iconName: '',
                                children: [
                                    {
                                        displayName: 'Fr',
                                        iconName: '',
                                        children: [
                                            {
                                                displayName: 'LF2018',
                                                iconName: '',
                                            },
                                            {
                                                displayName: 'Note COMMUNS N1',
                                                iconName: '',
                                            },
                                        ]
                                    },
                                    {
                                        displayName: 'Ar',
                                        iconName: '',
                                    },
                                ]
                            },
                            {
                                displayName: '2017',
                                iconName: '',
                                children: [
                                    {
                                        displayName: 'Fr',
                                        iconName: '',

                                    },
                                    {
                                        displayName: 'Ar',
                                        iconName: '',
                                        children: [
                                            {
                                                displayName: 'LF2017',
                                                iconName: '',
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                displayName: '2016',
                                iconName: '',
                                children: [
                                    {
                                        displayName: 'Fr',
                                        iconName: '',

                                    },
                                    {
                                        displayName: 'Ar',
                                        iconName: '',
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        displayName: 'Nouveauté',
                        iconName: '',
                        children: [
                            {
                                displayName: 'Taux de cotisation Cnss',
                                iconName: '',
                            }
                        ]
                    },
                ]
            },
            {
                displayName: 'Help',
                iconName: 'help',
            },
        ];
        return result
    }
}