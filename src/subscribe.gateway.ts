import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { FunnelService } from './funnel.service';
import { Socket } from 'ws';
import { Client } from './types/client';

@WebSocketGateway(80)
export class SubscribeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    constructor(private readonly funnelService: FunnelService) {}

    afterInit(server: any) {
        console.log("Gateway Initialized.")
    }

    handleConnection(socket: Socket, ...args: any[]) 
    {
        this.funnelService.subscribe(new Client(socket))
    }

    handleDisconnect(socket: Socket)
    {
        this.funnelService.unsubscribe_where((subscriber) => {
            if (subscriber instanceof Client)
            {
                return subscriber.socket == socket;
            }

            return false;
        })
    }
}