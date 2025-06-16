import { Injectable } from '@angular/core';
import Peer, { MediaConnection } from 'peerjs';

@Injectable({ providedIn: 'root' })
export class PeerService {
  private peer?: Peer;
  private activeCall?: MediaConnection;

  private ensurePeer(): Peer {
    if (!this.peer) {
      this.peer = new Peer(undefined, {
        host: 'localhost',
        port: 9000,
        path: '/'
      });
    }
    return this.peer;
  }

  async getLocalStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }

  call(remoteId: string, stream: MediaStream): MediaConnection {
    const peer = this.ensurePeer();
    const call = peer.call(remoteId, stream);
    this.activeCall = call;
    return call;
  }

  listen(stream: MediaStream, onRemoteStream: (remote: MediaStream) => void): void {
    const peer = this.ensurePeer();
    peer.on('call', call => {
      this.activeCall = call;
      call.answer(stream);
      call.on('stream', onRemoteStream);
    });
  }

  onOpen(callback: (id: string) => void): void {
    this.ensurePeer().on('open', callback);
  }
}
