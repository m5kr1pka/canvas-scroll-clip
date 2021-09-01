import { NoopFunction } from "../helpers/intefaces";
import { AppWarning } from "../helpers/error";
import { EventList } from "../helpers/utils";

/** 
* Event emitter
* https://github.com/peterkejun/Animated-Canvas/blob/05bf961da7cba31aa901054948293180a6131704/src/Helpers/EventEmitter.ts
**/
export class EventEmitter {
  /**
   * A map of event to a list of callbacks
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  private observers: Map<string, Array<any>>;

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
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  on = (event: string, cb: NoopFunction): void => {
    if (!EventList.includes(event)) {
      new AppWarning(`Event ['${event}'] is not supported.`);
    }

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
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  remove = (event: string, cb: NoopFunction): void => {
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
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
