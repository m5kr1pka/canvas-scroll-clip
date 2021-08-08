// import EventEmitter from 'events';

/** 
* Available events
**/
export const Event = {
  resize: 'viewport.events.resize',
  scroll: 'viewport.events.scroll'
}

declare type noop = (arg?: string) => void;

/** 
* Event emitter
* https://github.com/peterkejun/Animated-Canvas/blob/05bf961da7cba31aa901054948293180a6131704/src/Helpers/EventEmitter.ts
**/
export class EventEmitter {
  /**
   * A map of event to a list of callbacks
   */
  private observers: Map<string, Array<noop>>;

  /**
   * A new EventEmitter with no observers
   * @constructor
   */
  constructor() {
    // map of observers
    this.observers = new Map()
  }

  /**
   * Subcribe to an event by providing a callback
   * @param event the event to subscribe to
   * @param cb the callback to run when the event is emitted
   */
  on = (event: string, cb: noop): void => {
    // get list of cb for this event
    const observer = this.observers.get(event)
    // add cb to list if list exists
    if (observer) observer.push(cb)
    // initialize list with [cb]
    else this.observers.set(event, [cb])
  }

  /**
   * Unsubscribe to an event by removing a specific callback function
   * @param event the event to unsubscribe to
   * @param cb the callback to remove
   */
  remove = (event: string, cb: noop): void => {
    // get list of cb for this event;
    const observer = this.observers.get(event)
    // return if no such list exists
    if (!observer) return
    // find cb in list
    for (let i = 0; i < observer.length; i++) {
      // matching cb
      if (observer[i] === cb) {
        // remove cb from list
        observer.splice(i, 1)
        return
      }
    }
  }

  /**
   * Emit an event with arguments for callbacks
   * @param event the event to emit
   * @param args extra arguments for the callbacks of this event
   */
  // eslint-disable-next-line
  emit = (event: string, ...args: any[]): void => {
    // get list of cb for this event
    const observer = this.observers.get(event)
    // return if no such list exist
    if (!observer) return
    // call each cb with arguments
    for (let i = 0; i < observer.length; i++) {
      observer[i](...args)
    }
  }
}
