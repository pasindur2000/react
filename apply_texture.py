import sys
import trimesh

def apply_texture(image_path, model_path, output_path):
    # Load the model
    model = trimesh.load(model_path)

    # Load the image as texture
    texture = trimesh.visual.TextureVisuals(texture=image_path)

    # Apply texture to the model
    model.visual = texture

    # Export the textured model
    model.export(output_path)

if __name__ == "__main__":
    # Arguments: image_path, model_path, output_path
    apply_texture(sys.argv[1], sys.argv[2], 'models/output.obj')
