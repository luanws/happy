import Image from "../models/images"

class ImageView {
    static render(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.100.88:5000/uploads/${image.path}`
        }
    }

    static renderArray(images: Image[]) {
        return images.map(image => this.render(image))
    }
}

export default ImageView