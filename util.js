// parse raw string of rules into a list of objects
export const parseRules = raw =>
{
  // empty rules string passed
  if ( ! raw || ! String(raw).trim() )
    return []

  const rules_list = raw.split(',').map(rule => rule.trim())

  // parse rules into a list
  return rules_list.map(parseRule)
}

export const parseRule = raw =>
{
  // parse rules string to extract data. Format '<property> <operator> <value>'
  let matches = raw.match(/(^[a-zA-Z]{4,})\s{0,}(>=|<=|>|<|=)\s{0,}([0-9]+(\.[0-9]+)?)/)

  if ( ! matches || matches.length < 3 )
    throw new Error(`Could not parse rule raw string - ${raw}`)

  let [, property, operator, value] = matches

  // validate numerical value
  if ( ! /^[0-9]+(\.[0-9]+)?$/.test(value) )
    throw new Error(`Invalid numerical value supplied as rule string - ${raw}`)

  // parse numerical value into float
  value = parseFloat(value)

  // validate comparison operator
  if ( ! operator || ! /^(>|<)?\=?$/.test(operator) )
    throw new Error(`Could not parse a valid comparison operator from rule string - ${raw}`)

  return { property, operator, value }
}
