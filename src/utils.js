const processPath = path => path.replace('public/uploads', 'gallery');

const graphqlUrl = process.env.REACT_APP_GRAPHQL_URL ? `${process.env.REACT_APP_GRAPHQL_URL}` : 'http://localhost:8000';

const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
};

export { processPath, graphqlUrl, formatBytes };

