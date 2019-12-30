export const MigrationMap = {
    'church_serial_number': 'id',
    'date_year': 'startDate',
    'serialnumofmotherchurch': 'parentId',
    'name_of_villagearea_colony': 'place',
    'church_leader': 'elementLeader',
    'name_of_leader': 'leaderName',
    'obedience_discipleship': 'elementWord',
    'baptism_church': 'elementBaptism',
    'the_lords_supper': 'elementLordsSupper',
    'prayer': 'elementPrayer',
    'worship': 'elementWorship',
    'fellowship': 'elementFellowship',
    'offering_church': 'elementGiving',
    'ischurch_or_group': 'church',
}

export function migrate(): void {

}
