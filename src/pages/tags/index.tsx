import React from 'react';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import Layout from '../../components/Layout';
import { useTags } from './useTags';

const TagsPage: React.FC = () => {
  const { group, title } = useTags();
  return (
    <Layout>
      <section className="section">
        <Helmet title={`Tags | ${title}`} />
        <div className="container content">
          <div className="columns">
            <div
              className="column is-10 is-offset-1"
              style={{ marginBottom: '6rem' }}
            >
              <h1 className="title is-size-2 is-bold-light">Tags</h1>
              <ul className="taglist">
                {group.map(tag => (
                  <li key={tag.fieldValue}>
                    <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                      {tag.fieldValue} ({tag.totalCount})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default TagsPage;
