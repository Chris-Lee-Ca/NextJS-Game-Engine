/**
 * A global object pool that stores all game objects.
 * The pool is implemented as a Map where each game object is identified by a unique string key.
 * This allows for efficient access, updates, and management of game objects within the game loop.
 *
 * Key: Unique string identifier for each game object.
 * Value: Instance of a GameObject.
 */
import GameObject from "../components/GameObject";

const ObjectPool = new Map<string, GameObject>();

export default ObjectPool;
