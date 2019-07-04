import $ from "jquery";

export const getBlah = (availability) => {
  return $.ajax({
    method: 'get',
    url: `/blah`,
  });
};