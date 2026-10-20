import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

export default function ArticleList() {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  const badgeClass = (famille) => {
    switch (famille) {
      case 'informatique':
        return 'text-bg-primary';
      case 'bureau':
        return 'text-bg-success';
      case 'accessoires':
        return 'text-bg-info';
      default:
        return 'text-bg-secondary';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="h5 mb-0">Liste des articles</h2>

        <span className="badge rounded-pill ">
          {articles.length} article(s)
        </span>
      </div>

      <div className="card-body ">
        {articles.length === 0 ? (
          <div className="alert alert-info m-3">
            Aucun article enregistré.
          </div>) : (
          
            <table className="table table-hover
                              table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Désignation</th>
                  <th>Famille</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {articles.map(article => (
                  <tr key={article.id}>
                    <td>#{article.id}</td>

                    <td className="fw-bold">
                      {article.designation}
                    </td>

                    <td>
                      <span className={`badge ${badgeClass(article.famille)}`}>
                        {article.famille}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <Link
                          type="button"
                          className="btn btn-sm btn-outline-warning"
                         to={`/article/edit/${article.id}`}
                        >
                          Modifier
                        </Link>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            dispatch({type:"DELETE",payload:article.id})
                          }
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
        )}
      </div>
    </div>
  );
}