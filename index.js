import React from 'react'
import { parseRules } from './util'

export default class Base extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {}
  }

  componentDidMount()
  {
    // update metrics on window resize
    window.addEventListener('resize', this.onWindowResize.bind(this), false)

    // record initial viewport metrics
    this.onWindowResize()
  }

  componentWillUnmount()
  {
    window.removeEventListener('resize', this.onWindowResize.bind(this))
  }

  onWindowResize()
  {
    this.setState({
      // get current viewport width
      screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      // get current viewport height
      screenHeight: window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight,
    })
  }

  /**
    * Get property actual data by name
    */
  getPropertyDeviceValue(property)
  {
    switch ( property ) {
      case 'screenWidth':
        return this.state.screenWidth

      case 'screenHeight':
        return this.state.screenHeight
    }
  }

  /**
    * Parses the rules string into logic, compares with actual data
    * and returns user values accordingly.
    *
    * @param rulesString String rules comma-separated
    * @param valueIfTrue Mixed what will be returned if all rules match
    * @param valueIfFalse Mixed what will be returned one or more rules didn't match
    * @return Mixed user values, or undefined if no rules parsed or no device data was captured
    */

  onCondition(rulesString, valueIfTrue=true, valueIfFalse=false)
  {
    const rules = parseRules(rulesString)

    if ( 0 == rules.length )
      return

    let matched_rules = rules.filter(rule =>
    {
      const { property, operator, value } = rule
          , current_value = this.getPropertyDeviceValue( property )

      // no device data was captured
      if ( undefined === current_value )
        return

      let match = false

      switch ( rule.operator ) {
        case '>':
          match = current_value > rule.value
          break

        case '<':
          match = current_value < rule.value
          break

        case '>=':
          match = current_value >= rule.value
          break

        case '<=':
          match = current_value <= rule.value
          break

        case '=':
          match = current_value == rule.value
          break
      }

      return match
    })

    if ( rules.length == matched_rules.length ) { // if all rules match
      return valueIfTrue
    } else { // if one or more rules didn't match
      return valueIfFalse
    }
  }

  render()
  {
    return this.props.renderCallback({
      match: this.onCondition.bind(this),
    })
  }
}
