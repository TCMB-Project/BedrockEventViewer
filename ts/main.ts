import { world, system, Player } from "@minecraft/server"

let config: { output: string, excludes: string[] };
let dynamic_property_ids = world.getDynamicPropertyIds();
if(!dynamic_property_ids.includes('bev:config')){
    config = {
        output: 'log',
        excludes: ['entityLoad', 'entityRemove', 'entitySpawn']
    }
    world.setDynamicProperty('bev:config', JSON.stringify(config))
}else{
    let config_string: unknown = world.getDynamicProperty('bev:config');
    if(typeof config_string == 'string') config = JSON.parse(config_string);
}

function print(event: string, ...info: string[]){
    if(config.excludes.includes(event)) return;
    if(config.output == 'log'){
        console.log(event, info.toString());
    }else if(config.output == 'chat'){
        world.sendMessage(event);
    }
}

system.afterEvents.scriptEventReceive.subscribe((event)=>{
    switch(event.id){
        case 'bedrockeventviewer_config:output':{
            const config_enum = ['log', 'chat'];
            if(config_enum.includes(event.message)){
                config.output = event.message;
                world.setDynamicProperty('bev:config', JSON.stringify(config));
            }
        }
    }
}, {namespaces:['bedrockeventviewer_config']});

let afterEvents = world.afterEvents;

afterEvents.buttonPush.subscribe(()=>{ print('buttonPush') });

afterEvents.entityDie.subscribe(()=>{ print('entityDie') });
afterEvents.entityHealthChanged.subscribe(()=>{ print('entityHealthChanged') });
afterEvents.entityHitBlock.subscribe(()=>{ print('entityHitBlock') });
afterEvents.entityHitEntity.subscribe(()=>{ print('entityHitEntity') });
afterEvents.entityHurt.subscribe(()=>{ print('entityHurt') });
afterEvents.entityLoad.subscribe(()=>{ print('entityLoad') });
afterEvents.entityRemove.subscribe(()=>{ print('entityRemove') });
afterEvents.entitySpawn.subscribe(()=>{ print('entitySpawn') });

afterEvents.itemCompleteUse.subscribe(()=>{ print('itemCompleteUse') });
afterEvents.itemReleaseUse.subscribe(()=>{ print('itemReleaseUse') });
afterEvents.itemStartUse.subscribe(()=>{ print('itemStartUse') });
afterEvents.itemStartUseOn.subscribe(()=>{ print('itemStartUseOn') });
afterEvents.itemStopUse.subscribe(()=>{ print('itemStopUse') });
afterEvents.itemStopUseOn.subscribe(()=>{ print('itemStopUseOn') });
afterEvents.itemUse.subscribe(()=>{ print('itemUse') });
afterEvents.itemUseOn.subscribe(()=>{ print('itemUseOn') });

afterEvents.leverAction.subscribe(()=>{ print('leverAction') });

afterEvents.playerBreakBlock.subscribe(()=>{ print('playerBreakBlock') });
afterEvents.playerDimensionChange.subscribe(()=>{ print('playerDimensionChange') });
afterEvents.playerJoin.subscribe(()=>{ print('playerJoin') });
afterEvents.playerLeave.subscribe(()=>{ print('playerLeave') });
afterEvents.playerPlaceBlock.subscribe(()=>{ print('playerPlaceBlock') });
afterEvents.playerSpawn.subscribe(()=>{ print('playerSpawn') });

afterEvents.pressurePlatePop.subscribe(()=>{ print('pressurePlatePop') });
afterEvents.pressurePlatePush.subscribe(()=>{ print('pressurePlatePush') });

afterEvents.projectileHitBlock.subscribe(()=>{ print('projectileHitBlock') });
afterEvents.projectileHitEntity.subscribe(()=>{ print('projectileHitEntity') });

afterEvents.targetBlockHit.subscribe(()=>{ print('targetBlockHit') });
afterEvents.tripWireTrip.subscribe(()=>{ print('tripWireTrip') });