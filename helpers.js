module.exports = async function mapAsync(arr) {
  return await Promise.all(arr.map(async (item) => await item));
};
