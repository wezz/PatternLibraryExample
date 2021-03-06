﻿/// <reference path="managedinitiation.d.ts" />


class ManagedInitiationHelper// extends MMB.ManagedModule.Base 
{
	"use strict";
	public moduleName = 'ManagedInitiationHelper';
	public elementselector = '[data-managedinitiation-trigger]';
	public GlobalTriggerEvent = 'ManagedInitiation-Triggered';

	protected initiationFunctions: Function[] = [];

	protected $w = $(window);
	protected $body = $('body');

	constructor() 
	{
		//super();

		this.$w.on(this.GlobalTriggerEvent, (e, managedElement) =>
		{
			if (this.initiationFunctions.length > 0)
			{
				this.initiationFunctions.map((fn) =>
				{
					fn($(managedElement));
				});
			}
			$(managedElement).trigger(this.moduleName + 'trigger-completed')
		});
	}

	public InitiateArea(element)
	{
		this.$w.trigger(this.GlobalTriggerEvent, element);
		this.$w.trigger('loadoptionalcomponents');
	}

	// Should be the same function as in ManagedModuleBase
	public filterManagedElements(el, $parent)
	{
		//We want it to remove items that are not owned directly by the parent
		var $parents = $(el).parents(this.elementselector).eq(0);
		/* jshint ignore:start */
		return $parents.length === 0 || $parents.get(0) == $parent.get(0) || typeof $parents.attr('data-managedinitiation-triggeredtime') === 'string';
		/* jshint ignore:end */
	}

	

	public RunOnSectionInitiation(fn: Function)
	{
		if (typeof fn === "function")
		{
			this.initiationFunctions.push(fn)
		}
	}
}
export default new ManagedInitiationHelper();
