import rss from "@astrojs/rss";
import { getSortedPosts } from "@utils/content-utils";
import { url } from "@utils/url-utils";
import type { APIContext } from "astro";
import { siteConfig } from "@/config";

export async function GET(context: APIContext) {
	const blog = await getSortedPosts();

	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site: context.site ?? "https://lingem.pages.dev",
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.published,
			link: url(`/posts/${post.slug}/`),
			content: post.data.description || "",
		})),
		customData: `<language>${siteConfig.lang}</language>`,
	});
}
