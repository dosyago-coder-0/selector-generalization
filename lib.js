"use strict";
{
  const path_lcs = require('./path_lcs.js');
  const sg = {
    generalize, 
    set any_mode( mode ) {
      path_lcs.any_mode = mode;
    }
  };

  module.exports = sg;

  // helpers ( interface to path_lcs )
    
    function isEl( thing ) {
      return thing instanceof HTMLElement;
    }

    function run_mlcs( p_sels, n_sels ) {
      const p_els = p_sels.map( sel => isEl( sel ) ? sel : document.querySelector(sel) );
      const n_els = n_sels.map( sel => isEl( sel ) ? sel : document.querySelector(sel) );
      const p_paths = p_els.map( el => path_lcs.get_canonical_path( el ).canonical );
      const n_paths = n_els.map( el => path_lcs.get_canonical_path( el ).canonical );
      const p_basic = path_lcs.basic_multiple_lcs_from_canonical_path_list( p_paths );
      const n_basic = path_lcs.basic_multiple_lcs_from_canonical_path_list( n_paths );
      return { p_basic, n_basic };
    }

  function generalize( p_sels, n_sels ) {
    const mlcs_path = run_mlcs( p_sels, n_sels );
    const p_mlcs_sel = path_lcs.selector_from_canonical_path( mlcs_path.p_basic || [] );
    const n_mlcs_sel = path_lcs.selector_from_canonical_path( mlcs_path.n_basic || [] );
    return { positive: p_mlcs_sel, negative: n_mlcs_sel };
  }
}
