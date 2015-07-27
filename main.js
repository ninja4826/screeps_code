var creep_manager = require('creep_manager');
var spawn_manager = require('spawn_manager');
if (Object.keys(Game.spawns).length > 0) {
    var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    creep_manager();
    spawn_manager(spawn);
}