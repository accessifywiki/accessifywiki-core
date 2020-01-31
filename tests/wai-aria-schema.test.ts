/**
 * Test the WAI-ARIA RDF processor.
 *
 * @author NDF, 31-Jan-2020.
 */

import { WaiAriaSchema } from '../src/wai-aria-schema';

describe("Test the WAI-ARIA RDF processor.", () => {

  test("Schema :~ 'aria-1.rdf'", async () => {
    const schema = new WaiAriaSchema();
    const aria = await schema.process();

    expect(aria).not.toBeNull();
    expect(aria).toHaveProperty('attributes');

    expect(aria.roles).toHaveLength( 80 );
    expect(aria.attributes).toHaveLength( 46 );

    expect(aria.roles).toContain('alert');
    expect(aria.attributes).toContain('aria-live');
  });
});
