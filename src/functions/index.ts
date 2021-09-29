export const handle = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Hello World Serverless',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
