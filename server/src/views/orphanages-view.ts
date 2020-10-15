import Orphanage from "../models/orphanage"
import ImageView from "./images-view"

class OrphanageView {
    static render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            openingHours: orphanage.openingHours,
            openOnWeekends: orphanage.openOnWeekends,
            images: ImageView.renderArray(orphanage.images)
        }
    }

    static renderArray(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage))
    }
}

export default OrphanageView