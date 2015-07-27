module.exports = function(spawn) {
    var roles = {
        'harvester': [WORK, CARRY, MOVE],
        'builder': [WORK, WORK, WORK, CARRY, MOVE],
        'guard': [TOUGH, ATTACK, MOVE, MOVE]
    }
    var role;
    var creeps = {
        'harvester': [],
        'builder': [],
        'guard': []
    };
    
    for (var name in Game.creeps) {
        var role = Game.creeps[name].memory.role;
        if (!(role in creeps)) {
            creeps[role] = [];
        }
        creeps[role].push(Game.creeps[name]);
    }
    if (creeps['harvester'].length < 2) {
        if (spawn.canCreateCreep(roles['harvester']) != OK) {
            console.log('harvester');
            return;
        }
        role = 'harvester';
    } else if (creeps['builder'].length < 1) {
        if (spawn.canCreateCreep(roles['builder']) != OK) {
            console.log('builder');
            return;
        }
        role = 'builder';
    } else if (creeps['guard'].length < 2) {
        if (spawn.canCreateCreep(roles['guard']) != OK) {
            console.log('guard');
            return;
        }
        role = 'guard';
    }
    var creep_name = role + (creeps[role].length + 1);
    spawn.createCreep(roles[role], creep_name);
    var creep;
    while (!(creep_name in Game.creeps)) {
        console.log(creep_name + ' does not exist');
    }
    creep = Game.creeps[creep_name];
    while (!('role' in creep.memory)) {
        creep.memory.role = role;
        console.log('trying to set role');
    }
    console.log('SET ROLE');
}