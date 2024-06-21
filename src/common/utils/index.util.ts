/**
 * 获取分页信息
 * @returns
 * @param data
 */
export const getPagination = (data: {
  list?: any[];
  total?: number;
  pageSize?: number;
  pageNumber?: number;
}) => {
  const { list = [], total = 10, pageSize = 1, pageNumber = 10 } = data;
  const pages = Math.ceil(total / pageSize);
  return {
    total: Number(total),
    pageNumber: Number(pageNumber),
    pageSize: Number(pageSize),
    pages: Number(pages),
    isFirstPage: Number(pageNumber) === 1,
    isLastPage: Number(pageNumber) === pages,
    hasNextPage: Number(pageNumber) < pages,
    list: list,
  };
};

//返回树形菜单
export const getRoutesModule = (routes: any) => {
  const result = [];
  routes.forEach((item) => {
    if (item.pid === 0) {
      result.push({ ...item, children: [] });
    }
  });
  result.forEach((item) => {
    routes.forEach((i) => {
      if (i.pid === item.id) {
        item.children.push(i);
      }
    });
  });
  return result;
};
