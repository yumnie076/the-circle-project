import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeerService } from './peer.service';

@Component({
  selector: 'avans-peer-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2">
      <div>My ID: {{ peerId }}</div>
      <div class="flex gap-2">
        <video #localVideo autoplay playsinline muted class="w-40 h-32 bg-black"></video>
        <video #remoteVideo autoplay playsinline class="w-40 h-32 bg-black"></video>
      </div>
      <div class="flex gap-2 items-center">
        <input #remoteIdInput type="text" placeholder="Remote ID" class="border p-1" />
        <button (click)="startCall(remoteIdInput.value)" class="border px-2">Call</button>
      </div>
    </div>
  `
})
export class PeerDemoComponent implements OnInit {
  @ViewChild('localVideo', { static: true }) localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo', { static: true }) remoteVideo!: ElementRef<HTMLVideoElement>;

  peerId = '';

  constructor(private readonly peerService: PeerService) {}

  async ngOnInit(): Promise<void> {
    const localStream = await this.peerService.getLocalStream();
    this.localVideo.nativeElement.srcObject = localStream;

    this.peerService.onOpen(id => {
      console.log('[PeerDemo] my id', id);
      this.peerId = id;
    });
    this.peerService.listen(localStream, stream => {
      console.log('[PeerDemo] received remote stream');
      this.remoteVideo.nativeElement.srcObject = stream;
    });
  }

  async startCall(id: string): Promise<void> {
    const localStream = await this.peerService.getLocalStream();
    this.peerService.call(id, localStream).on('stream', stream => {
      console.log('[PeerDemo] call received remote stream');
      this.remoteVideo.nativeElement.srcObject = stream;
    });
  }
}
