import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core'
import { DeviceService } from 'src/app/services/device.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Photo } from 'src/app/models/photo.model'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  photos: Photo[] = []
  selectedPhoto: Photo | null = null
  newPhoto: Photo = {
    albumId: 0,
    id: 0,
    title: '',
    url: '',
    thumbnailUrl: ''
  }
  isLoading = false
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>

  constructor(
    private deviceService: DeviceService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.isLoading = true
    this.deviceService.getAll().subscribe({
      next: (photos) => {
        this.photos = photos
        this.isLoading = false
      },
      error: (error) => {
        console.error('Error al cargar las fotos:', error)
        this.isLoading = false
      }
    })
  }

  // Guardar nuevo objeto desde el tfoot
  saveNew() {
    if (this.newPhoto.title && this.newPhoto.url && this.newPhoto.thumbnailUrl) {
      this.deviceService.save(this.newPhoto).subscribe({
        next: (photo) => {
          this.photos.unshift(photo)
          // Limpiar formulario
          this.newPhoto = {
            albumId: 0,
            id: 0,
            title: '',
            url: '',
            thumbnailUrl: ''
          }
        },
        error: (error) => {
          console.error('Error al guardar la foto:', error)
          alert('Error al guardar la foto. Por favor, intente nuevamente.')
        }
      })
    } else {
      alert('Por favor, complete todos los campos requeridos.')
    }
  }

  // Actualizar objeto existente desde el modal
  update() {
    if (this.selectedPhoto && this.selectedPhoto.id) {
      // Validar campos requeridos
      if (!this.selectedPhoto.title || !this.selectedPhoto.url || !this.selectedPhoto.thumbnailUrl) {
        alert('Por favor, complete todos los campos requeridos.')
        return
      }

      // JSONPlaceholder es una API de prueba que no persiste cambios
      // Actualizamos directamente en el array local
      const index = this.photos.findIndex(p => p.id === this.selectedPhoto!.id)
      if (index !== -1) {
        // Actualizar localmente
        this.photos[index] = { ...this.selectedPhoto }
        this.modalService.dismissAll()
        this.selectedPhoto = null
        alert('Foto actualizada correctamente.')
        
        // Intentar actualizar en la API (opcional, no bloquea si falla)
        this.deviceService.update(this.photos[index]).subscribe({
          next: () => {
            // Silencioso - la actualización local ya se hizo
          },
          error: (error) => {
            // Ignorar error - JSONPlaceholder puede fallar pero ya actualizamos localmente
            console.log('Nota: JSONPlaceholder es una API de prueba que no persiste cambios')
          }
        })
      } else {
        alert('No se encontró la foto a actualizar.')
      }
    }
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta foto?')) {
      this.deviceService.delete(id).subscribe({
        next: () => {
          this.photos = this.photos.filter(p => p.id !== id)
          alert('Foto eliminada correctamente.')
        },
        error: (error) => {
          console.error('Error al eliminar la foto:', error)
          // JSONPlaceholder es una API de prueba, eliminamos localmente aunque falle
          this.photos = this.photos.filter(p => p.id !== id)
          alert('Foto eliminada localmente. (Nota: JSONPlaceholder es una API de prueba que no persiste cambios)')
        }
      })
    }
  }

  // Abrir modal para editar (actualizar) un objeto
  edit(photo: Photo) {
    this.selectedPhoto = { ...photo }
    this.modalService.open(this.modalTemplate, { size: 'lg' })
  }

}
