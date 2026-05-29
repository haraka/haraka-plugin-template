// assert: https://nodejs.org/api/assert.html
const assert = require('node:assert/strict')
const { beforeEach, describe, it } = require('node:test')

// npm modules
const { makeConnection, makePlugin } = require('haraka-test-fixtures')

beforeEach(() => {
  this.plugin = new fixtures.plugin('template')

  this.plugin = makePlugin('template', { register: false })
})

describe('register', () => {
  it('has a register function', () => {
    assert.equal('function', typeof this.plugin.register)
  })

  it('registers', () => {
    const expected_cfg = {
      main: {
        disabled: false,
        enabled: true,
      },
      feature_section: {
        yes: true,
      },
    }

    assert.deepEqual(this.plugin.cfg, undefined)
    this.plugin.register()
    assert.deepEqual(this.plugin.cfg, expected_cfg)
  })

  it('register() loads config via load_template_ini', () => {
    this.plugin.register()
    assert.equal(this.plugin.cfg.main.enabled, true)
    assert.equal(this.plugin.cfg.main.disabled, false)
    assert.equal(this.plugin.cfg.feature_section.yes, true)
  })
})

describe('load_template_ini', () => {
  it('loads', () => {
    assert.equal('object', typeof this.plugin)
    assert.equal('template', this.plugin.name)
  })

  it('loads template.ini from config/template.ini', () => {
    this.plugin.load_template_ini()
    assert.ok(this.plugin.cfg)
  })

  it('initializes enabled boolean', () => {
    this.plugin.load_template_ini()
    assert.equal(this.plugin.cfg.main.enabled, true, this.plugin.cfg)
  })
})

describe('uses text fixtures', () => {
  it('sets up a connection', () => {
    this.connection = makeConnection()
    assert.ok(this.connection.server)
  })

  it('sets up a transaction', () => {
    this.connection = makeConnection({ withTxn: true })
    assert.ok(this.connection.transaction.header)
  })
})
