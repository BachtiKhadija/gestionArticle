import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  addArticle,
  editArticle
} from '../actions/articleActions';

const emptyForm = {
  designation: '',
  famille: ''
};

export default function ArticleForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const articles = useSelector(state => state.articles);

  // Si l'URL contient un ID, on recherche l'article correspondant.
  const articleToEdit = id
    ? articles.find(article => article.id === Number(id))
    : null;

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      if (articleToEdit) {
        setForm({
          designation: articleToEdit.designation,
          famille: articleToEdit.famille
        });
        setError('');
      } else {
        setError('Article introuvable.');
      }
    } else {
      setForm(emptyForm);
      setError('');
    }
  }, [id, isEditMode, articleToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const designation = form.designation.trim();
    const famille = form.famille.trim();

    if (!designation || !famille) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (isEditMode && !articleToEdit) {
      setError('Impossible de modifier : article introuvable.');
      return;
    }

    if (isEditMode) {
      dispatch(editArticle({
        id: Number(id),
        designation,
        famille
      }));
    } else {
      dispatch(addArticle({
        id: Date.now(),
        designation,
        famille
      }));
    }

    navigate('/articles');
  };
  const familles = [
  { value: "informatique", label: "Informatique" },
  { value: "bureau", label: "Bureau" },
  { value: "accessoires", label: "Accessoires" },
  { value: "autre", label: "Autre" },
];

  return (
    <div className="card border-0 shadow-sm">
      <div
        className={`card-header text-white ${
          isEditMode ? 'bg-warning' : 'bg-primary'
        }`}
      >
        <h2 className="h5 mb-0">
          {isEditMode ? 'Modifier un article' : 'Ajouter un article'}
        </h2>
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="designation" className="form-label">
              Désignation
            </label>

            <input
              id="designation"
              name="designation"
              className="form-control"
              value={form.designation}
              onChange={handleChange}
              placeholder="Ex. Clavier sans fil"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="famille" className="form-label">
              Famille
            </label>

            <select
              id="famille"
              name="famille"
              className="form-select"
              value={form.famille}
              onChange={handleChange}
              required
            >
               {familles.map((f) => (
                <option key={f.value} value={f.value}>
                {f.label}
                </option>
                 ))}
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className={`btn ${
                isEditMode ? 'btn-warning' : 'btn-primary'
              }`}
              disabled={isEditMode && !articleToEdit}
            >
              {isEditMode
                ? 'Enregistrer les modifications'
                : 'Ajouter'}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/articles')}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}