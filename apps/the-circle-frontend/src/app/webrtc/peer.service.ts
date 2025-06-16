import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Injectable({ providedIn: 'root' })
export class PeerService {
  private peer?: Peer;
  private activeCall?: MediaConnection;

  private ensurePeer(): Peer {
    if (!this.peer) {
      this.peer = new Peer(undefined, {
        host: environment.PEER_SERVER_HOST,
        port: environment.PEER_SERVER_PORT,
        path: '/'
      });
      this.peer.on('open', id => console.log('[PeerService] Peer open with id', id));
    }
    return this.peer;
  }

  async getLocalStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }

  call(remoteId: string, stream: MediaStream): MediaConnection {
    const peer = this.ensurePeer();
    console.log('[PeerService] calling', remoteId);
    const call = peer.call(remoteId, stream);
    this.activeCall = call;
    return call;
  }

  listen(stream: MediaStream, onRemoteStream: (remote: MediaStream) => void): void {
    const peer = this.ensurePeer();
    console.log('[PeerService] Listening for incoming calls');
    peer.on('call', call => {
      console.log('[PeerService] Incoming call from', call.peer);
      this.activeCall = call;
      call.answer(stream);
      call.on('stream', remote => {
        console.log('[PeerService] Received remote stream');
        onRemoteStream(remote);
      });
      call.on('close', () => {
        console.log('[PeerService] Call closed');
        this.activeCall = undefined;
      });
      call.on('error', err => console.error('[PeerService] Call error', err));
    });
  }

  onOpen(callback: (id: string) => void): void {
    this.ensurePeer().on('open', id => {
      console.log('[PeerService] onOpen id', id);
      callback(id);
    });
  }
}
