
class DisjointSet {
	constructor (n = 0) {
		this._numGroups = n
		this._entries = new Array(n)
		for (let i = 0; i < n; i++) {
			this._entries[i] = { parentIndex: i, size: 1 }
		}
	}

	size () { return this._entries.length }

	numGroups () { return this._numGroups }

	_findGroup (_index) {
		let index = _index
		let group = this._entries[index]
		while (group.parentIndex !== index) {
			index = group.parentIndex
			const parent = this._entries[index]
			group.parentIndex = parent.parentIndex
			group = parent
		}
		return group
	}

	findGroup (index) {
		return this._findGroup(index).parentIndex
	}

	areConnected (aIndex, bIndex) {
		if (aIndex === bIndex) { return true }
		return this._findGroup(aIndex) === this._findGroup(bIndex)
	}

	_merge (aGroup, bGroup) {
		if (aGroup === bGroup) { return aGroup }

		let parentGroup
		let childGroup
		if (aGroup.size < bGroup.size) {
			parentGroup = bGroup
			childGroup = aGroup
		} else {
			parentGroup = aGroup
			childGroup = bGroup
		}

		this._numGroups--
		childGroup.parentIndex = parentGroup.parentIndex
		parentGroup.size += childGroup.size
		return parentGroup
	}

	merge (aIndex, bIndex) {
		const aGroup = this._findGroup(aIndex)
		const bGroup = this._findGroup(bIndex)
		return this._merge(aGroup, bGroup).parentIndex
	}
}

module.exports = { DisjointSet }
