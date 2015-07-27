module.exports = function(spawn) {
    var roles = {
        'harvester': [WORK, CARRY, MOVE],
        'builder': [WORK, WORK, WORK, CARRY, MOVE],
        'guard': [TOUGH, ATTACK, MOVE, MOVE]
    }
    var role;
    var creeps = {};
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
    Game.creeps[creep_name].memory.role = role;
}