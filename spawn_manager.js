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
    if (!('spawn_queue' in spawn.memory)) {
        spawn.memory.spawn_queue = {
            'harvester': [],
            'builder': [],
            'guard': []
        };
    }
    if (spawn.canCreateCreep(roles[spawn.memory.building]) == OK) {
        if (spawn.memory.spawn_queue[spawn.memory.building].length > 0) {
            Game.creeps[spawn.memory.spawn_queue[spawn.memory.building][0]].memory.role = spawn.memory.building;
            console.log('Created Creep with role: '+spawn.memory.building);
            spawn.memory.spawn_queue[spawn.memory.building].shift();
        }
    }
    for (var name in Game.creeps) {
        var role = Game.creeps[name].memory.role;
        if (!(role in creeps)) {
            creeps[role] = [];
        }
        creeps[role].push(Game.creeps[name]);
    }
    if (creeps['harvester'].length < 2) {
        if (spawn.canCreateCreep(roles['harvester']) != OK) {
            return;
        }
        role = 'harvester';
    } else if (creeps['builder'].length < 1) {
        if (spawn.canCreateCreep(roles['builder']) != OK) {
            return;
        }
        role = 'builder';
    } else if (creeps['guard'].length < 2) {
        if (spawn.canCreateCreep(roles['guard']) != OK) {
            return;
        }
        role = 'guard';
    }
    var creep_name = role + creeps[role].length + 1;
    spawn.createCreep(roles[role], creep_name);
    spawn.memory.building = role;
    spawn.memory.spawn_queue[role].push(creep_name);
}