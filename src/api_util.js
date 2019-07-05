import $ from "jquery";

export const getBlah = () => {
  return $.ajax({
    method: 'get',
    url: `/blah`,
  });
};