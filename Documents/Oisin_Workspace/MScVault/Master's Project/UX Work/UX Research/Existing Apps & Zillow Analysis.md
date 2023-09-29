## Zillow Demo
> [!note] Description
> Zillow is a north American property listings web app. It allows users to search through property listings in a given area. 

>[!tip] Demo Video 
><iframe width="560" height="315" src="https://www.youtube.com/embed/p4hWjYcUNzE?si=ejbONkswtFcEB3CU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
## Daft.ie Demo
>[!note] Description
>Daft.ie is Irelands leading rental listings web app. It allows users to search through property listings in a given area.

> [!tip] Demo Video
> <iframe width="560" height="315" src="https://www.youtube.com/embed/Hof2qcAWqi4?si=REJesSF5yGyJ52F7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Zillow Analysis and Critique
Generally speaking, the site makes use of many traditional UX techniques such as chunking, gestalt laws of common region, similarity, proximity, continuity, figure ground. Shadows are used to provide light borders and distinctiveness between foreground objects and background, while also providing indications of depth.

The website features minimalist "clean" aesthetic elements, similar to flat 2.0, however this is not consistent throughout.
### Landing and Browsing Pages
While the Zillow landing page is very clean and minimalist, the main browsing page could be considered cluttered and visually overwhelming. The map view and list view for rentals are combined to take up the entire window width. This could be considered visually overwhelming to the user. 

![[Pasted image 20230929162946.png]]
[Figure 1]: Zillow map zoomed out, note the results listing on the right.
![[Pasted image 20230929163021.png]]
[Figure 2]: The same browsing session after zooming in, note how the listings results have changed to reflect the current bounds of the map view.

That being said, it makes sense to associate the map points with the listings within a combined view, as there is a filtering function to it (i.e. the results in the list are filtered based on whether they are in the current viewport of the map). This functionality is also available on the mobile version of the application, where the user must switch between the map and list view.  Separating the views may break this association, and thus make it harder for the user to understand the functionality and relation between them.

If we think about how this feature may be used by a person, it becomes fairly obvious that this is a coarse-grain filtering tool rather than a fine-grained filtering tool. i.e. this tool allows for broad stroke filtering. This means that it could be used earlier in the typical browsing journey, and then not be used thereafter.

> [!example] Example Journey
> 1. User Navigates to browsing page
> 2. User inputs location into search bar
> 3. User uses the map view to pan and zoom into a desired area.
> 4. User can then filter based on the finer filtering options.

It may be a useful feature to be able to toggle the map on/off or at least expand/collapse it. This would allow more search results to be visible after the user has finished panning the map. While adding an extra action to view the map may be considered a step backward, I believe it warrants investigation with some **A/B testing** with a focus group.

> [!tip] Possible Solutions
> > 1. Create a toggle that expands/collapses the map menu to the side, which is set as expanded by default.
> > 	**OR**
> > 2. Have the map view placed above the list view, and have an anchor element on each that allows the user to quickly jump between them without having to scroll.![[Pasted image 20230929200041.png]]

I believe option 2 would be the superior choice, as it would require less movement of the page than option 3. Excessive page movement can often be disorienting to inexperienced/motion sensitive users, so muted and less intense motion/page layout shifts are beneficial. An A/B test with wireframes might be beneficial.

Another pain point is the listings themselves actually differ in their content. Some listings in the result actually represent apartment blocks, with multiple floor plans for different types of apartments. However, there is no icon to indicate whether a listing is a apartment complex with multiple vacancies or a singular listing, bar a small '+' symbol that is appended to the prices. 

This is not to say that being able to see apartment complexes and their available units is a bad feature, it's actually quite useful. However, it should be clear to the user what it is that they are about to view, as it can significantly impact the format of the details modal, as discussed in the next section.
### Details Modal

![[Pasted image 20230929215823.png]]
The details modal for Zillow is somewhat crowded, this could be an issue of using a modal that only partially covers the screen. This compresses the content into a smaller area. Additionally, the format of the modals text content can vary significantly between different listings (i.e. is actually a apartment complex with different units available, or does not have specific details available). Personally speaking, this causes a sense of claustrophobia/uncertainty when viewing different listings. This variability in the so called 'schema' of the modal could impede the development of familiarity with the system, as users will have to grow accustomed to the changing formats. With a single standard format, enforced globally across all listings, with null values still represented, 

One way to solve this (at least for the )