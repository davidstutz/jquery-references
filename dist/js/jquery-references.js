/**
 * jQuery References (https://github.com/davidstutz/jquery-references)
 * 
 * Copyright 2017 David Stutz
 * 
 * Licensed under BSD-3-Clause
 */
(function($) {
    /** Empty reference map to save references. */
    $.fn.reference_map = {};
    /** Reference counter. */
    $.fn.reference_counters = {};

    /**
     * @param type "label" or "reference"/"ref" depending on whether a 
     *        label or a reference to an existing label should be placed.
     * @param options
     */
    $.fn.reference = function(type, scope, options) {
 
        $(this).each(function() {
            
            // Merge with default settings.
            var settings = $.extend({
                verbose: true,
                verbose_text: 'Reference not found!',
            }, options);

            var id = $(this).attr('id');
            
            // Distinguigh both cases.
            // The label option shoul dbe called on all labels first.
            // Then, after all labels are initialized, the reference option should be called on all references.
            if (type.toLowerCase() === 'label') {
                $(this).addClass(id + '-lbl');

                if (!(scope in $.fn.reference_map)) {
                    $.fn.reference_map[scope] = {};
                    $.fn.reference_counters[scope] = 1;
                }

                $.fn.reference_map[scope][id] = $.fn.reference_counters[scope]
                $.fn.reference_counters[scope]++;
                
                $(this).text($.fn.reference_map[scope][id]);
            }
            else if (type.toLowerCase() === 'ref' || type.toLowerCase() === 'reference') {
                $(this).addClass(id + '-ref');

                if (scope in $.fn.reference_map && id in $.fn.reference_map[scope]) {
                    $(this).text($.fn.reference_map[scope][id]);
                }
                else if (settings.verbose) {
                    $(this).text(settings.verbose_text);
                }
            }
        });
        
        return this;
    };
}(jQuery));