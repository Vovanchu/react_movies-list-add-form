import { useState } from 'react';
import { TextField } from '../TextField';

const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;

function validateUrl(value: string) {
  if (!value) {
    return null;
  }

  return urlRegex.test(value) ? null : 'Please enter a valid URL';
}

interface NewMovieProps {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd(formData);

    // Clear the form
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title.trim()}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, title: newValue }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description.trim()}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, description: newValue }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl.trim()}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, imgUrl: newValue }))
        }
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl.trim()}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, imdbUrl: newValue }))
        }
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId.trim()}
        onChange={newValue =>
          setFormData(prev => ({ ...prev, imdbId: newValue }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !formData.title ||
              !formData.imgUrl ||
              !formData.imdbUrl ||
              !formData.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
