# Uncomment if you are in a Jupyter Notebook
# import nest_asyncio
# nest_asyncio.apply()

# example github: https://github.com/run-llama/llama_parse

from llama_parse import LlamaParse  # pip install llama-parse
from llama_index import SimpleDirectoryReader  # pip install llama-index

parser = LlamaParse(
    api_key="...",  # can also be set in your env as LLAMA_CLOUD_API_KEY
    result_type="markdown"  # "markdown" and "text" are available
)

file_extractor = {".pdf": parser}
documents = SimpleDirectoryReader("./data", file_extractor=file_extractor).load_data()